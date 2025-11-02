# Firebase Security Rules Setup

To fix the "Missing or insufficient permissions" error, you need to update your Firestore security rules in the Firebase Console.

## Steps:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `meolu-fa8f3`
3. Navigate to **Firestore Database** > **Rules** tab
4. Replace the existing rules with the following:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to rsvps collection
    match /rsvps/{rsvpId} {
      allow read, write: if true;
    }

    // Allow read/write access to guestbook collection
    match /guestbook/{messageId} {
      allow read, write: if true;
    }
  }
}
```

5. Click **Publish** to save the rules

## Note:
These rules allow unrestricted access to `rsvps` and `guestbook` collections. For production, you may want to add additional security (e.g., rate limiting, input validation, or authentication requirements).

Alternatively, you can copy the rules from the `firestore.rules` file in the project root and deploy them using Firebase CLI.

