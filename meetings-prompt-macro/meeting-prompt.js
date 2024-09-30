import xapi from 'xapi';

// Define your password (this is just an example, for production use a more secure method)
const ADMIN_PASSWORD = 'admin';

// Function to retrieve the list of meetings and display a selection prompt
function showMeetingSelectionPrompt() {
  console.log('Retrieving meeting list...');
  xapi.command('Bookings List').then((response) => {
    const meetings = response.Booking;

    console.log('Retrieved meetings:', meetings);

    if (!meetings || meetings.length === 0) {
      xapi.command("UserInterface Message Alert Display", {
        Title: "No Meetings",
        Text: "There are no scheduled meetings.",
        Duration: 5
      });
      return;
    }

    const options = {};
    meetings.forEach((meeting, index) => {
      options[`Option.${index + 1}`] = `${meeting.Title} (${meeting.Time.StartTime} - ${meeting.Time.EndTime})`;
    });

    // Add the "Back" button option
    options[`Option.${meetings.length + 1}`] = 'Back';

    xapi.command('UserInterface Message Prompt Display', {
      Title: 'Select a Meeting',
      Text: 'Choose a meeting to delete or go back:',
      FeedbackId: 'select-meeting',
      ...options
    });

    xapi.event.once('UserInterface Message Prompt Response', (event) => {
      const selectedIndex = parseInt(event.OptionId, 10) - 1;

      if (selectedIndex === meetings.length) {
        console.log('User chose to go back to the main menu.');
        return;
      }

      requestPasswordForDeletion(meetings[selectedIndex]);  // Request password before deletion
    });
  }).catch((err) => {
    console.error(`Error retrieving meetings: ${err.message}`);
    xapi.command("UserInterface Message Alert Display", {
      Title: "Error",
      Text: "Failed to retrieve meetings.",
      Duration: 5
    });
  });
}

// Function to request a password before deleting the meeting
function requestPasswordForDeletion(meeting) {
  console.log(`Requesting password for deleting meeting: ${meeting.Title}`);

  xapi.command('UserInterface Message TextInput Display', {
    Title: 'Password Required',
    Text: 'Enter the admin password to delete the meeting:',
    FeedbackId: `password-check-${meeting.MeetingId}`,
    InputType: 'Password',
    Placeholder: 'Enter Password',
    SubmitText: 'Submit'
  });

  xapi.event.once('UserInterface Message TextInput Response', (event) => {
    if (event.FeedbackId === `password-check-${meeting.MeetingId}`) {
      const enteredPassword = event.Text;

      if (enteredPassword === ADMIN_PASSWORD) {
        console.log('Password correct. Proceeding with deletion...');
        showDeleteMeetingPrompt(meeting);  // Proceed to deletion after password is verified
      } else {
        console.log('Incorrect password entered.');
        xapi.command("UserInterface Message Alert Display", {
          Title: "Error",
          Text: "Incorrect password. Meeting not deleted.",
          Duration: 5
        });
      }
    }
  });
}

// Function to display delete prompt for the selected meeting
function showDeleteMeetingPrompt(meeting) {
  console.log(`Displaying delete prompt for meeting: ${meeting.Title}, MeetingId: ${meeting.MeetingId}`);
  
  xapi.command('UserInterface Message Prompt Display', {
    Title: `Delete ${meeting.Title}`,
    Text: `Do you want to delete the meeting "${meeting.Title}" scheduled from ${meeting.Time.StartTime} to ${meeting.Time.EndTime}?`,
    FeedbackId: `confirm-delete-${meeting.MeetingId}`,
    'Option.1': 'Delete',
    'Option.2': 'Back'
  });

  xapi.event.once('UserInterface Message Prompt Response', (event) => {
    if (event.FeedbackId === `confirm-delete-${meeting.MeetingId}`) {
      if (event.OptionId === '1') {
        declineMeeting(meeting);  // First decline the meeting before deleting
      } else if (event.OptionId === '2') {
        console.log('User chose to go back to the meeting selection.');
        showMeetingSelectionPrompt();  // Go back to the meeting selection
      }
    }
  });
}

// Function to decline the meeting
function declineMeeting(meeting) {
  console.log(`Declining meeting with MeetingId: ${meeting.MeetingId}`);
  
  xapi.command('Bookings Respond', { 
      MeetingId: meeting.MeetingId, 
      Type: 'Decline',
      Comment: 'Room decline for deletion'
  })
    .then(() => {
      console.log(`Meeting with MeetingId ${meeting.MeetingId} successfully declined.`);
      deleteMeeting(meeting);  // Proceed to delete the meeting after declining
    })
    .catch((err) => {
      console.error(`Error declining meeting with MeetingId ${meeting.MeetingId}: ${err.message}`);
      xapi.command("UserInterface Message Alert Display", {
        Title: "Error",
        Text: "Failed to decline the meeting.",
        Duration: 5
      });
    });
}

// Function to delete the meeting using MeetingId
function deleteMeeting(meeting) {
  console.log(`Attempting to delete meeting with MeetingId: ${meeting.MeetingId}`);
  
  xapi.command('Bookings Delete', { MeetingId: meeting.MeetingId })
    .then(() => {
      console.log(`Meeting with MeetingId ${meeting.MeetingId} successfully deleted.`);
      xapi.command("UserInterface Message Alert Display", {
        Title: "Success",
        Text: "The meeting was successfully deleted.",
        Duration: 5
      });

      setTimeout(() => {
        verifyMeetingDeletion(meeting.MeetingId, 0);  // Pass only MeetingId for verification
      }, 2000);
    })
    .catch((err) => {
      console.error(`Error deleting meeting with MeetingId ${meeting.MeetingId}: ${err.message}`);
      xapi.command("UserInterface Message Alert Display", {
        Title: "Error",
        Text: "Failed to delete the meeting.",
        Duration: 5
      });
    });
}

// Verification function now only checks by MeetingId
function verifyMeetingDeletion(deletedMeetingId, retryCount) {
  console.log(`Verifying meeting deletion by MeetingId... Retry Count: ${retryCount}`);
  
  xapi.command('Bookings List')
    .then((response) => {
      const bookings = response.Booking;
      console.log('Current meetings after deletion:', bookings);

      let meetingStillExists = false;

      if (bookings && bookings.length > 0) {
        bookings.forEach((meeting) => {
          if (meeting.MeetingId === deletedMeetingId) {
            meetingStillExists = true;
            console.error(`ERROR: Meeting with MeetingId ${deletedMeetingId} was not deleted successfully!`);
          }
        });
      } else {
        console.log('No meetings found after deletion.');
      }

      if (meetingStillExists && retryCount < 3) {
        setTimeout(() => {
          verifyMeetingDeletion(deletedMeetingId, retryCount + 1);
        }, 2000);
      } else if (!meetingStillExists) {
        console.log(`Meeting with MeetingId ${deletedMeetingId} has been successfully removed from the list.`);
      } else {
        console.error(`Meeting with MeetingId ${deletedMeetingId} could not be deleted after 3 attempts.`);
      }
    })
    .catch((err) => {
      console.error(`Error retrieving bookings after deletion: ${err.message}`);
    });
}

// Add a listener for button widget actions
xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if (event.WidgetId === 'startMeetingSelection' && event.Type === 'pressed') {
    console.log('Meeting selection button pressed');
    showMeetingSelectionPrompt();
  }
});
