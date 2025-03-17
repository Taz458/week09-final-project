🎯 What requirements did you achieve?
All the requirements, apart from a couple stretch goals.

🎯 Were there any requirements or goals that you were unable to achieve?
Just a few stretch goals like eiditing my profile after creation, and likes and follows.

🎯 If so, what was it that you found difficult about these tasks?
I didn't have enough brainpower, time, energy and I would've probably needed help on the SQL.

Overall, this has been the hardest yet most rewarding project. Unlike my previous assignemnt, I understood 'use client' and 'use server' way more, so I 
didn't need a seperate 'actions.js' file. I also felt I understood the SQL joining and selecting and Array Agg alot more. It was a lot more complex now 
with clerk, but I have grasped the conept of clerk producing a unique ID for each user I can then use that unique identifier to access each users name, bio etc
in my users table. And also using Auth to get the userID/ClerkID was very useful!

I also styled everyhting using tailwind, and some new things I learnt/implemented were:

.isArray()
revalidatepath
RADIX UI - MODAL
(I did manage to do the raidx UI, essentially if the user logs into clerk but doesnt create a profile, the sign in modal shows up and takes the user to the profile)

HERE IT IS IN CASE IT DOESN'T SHOW UP AS IT ISN'T NEEDED:
//My radix ui component, using react dialog

// components/SignInModal.js
'use client';
import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';

const SignInModal = () => {
    const router = useRouter();

    return (
        <Dialog.Root open>
        <Dialog.Trigger style={{ display: 'none' }} />
        <Dialog.Overlay style={overlayStyles} />
        <Dialog.Content style={modalStyles}>
            <Dialog.Title>You need to sign in first</Dialog.Title>
            <Dialog.Description>Please sign in to access this content.</Dialog.Description>
            <button
            onClick={() => {
                router.push('/profile'); // Redirect to the profile page
            }}
            >
            Go to Profile
            </button>
        </Dialog.Content>
        </Dialog.Root>
    );
    };

    // Style for the modal and overlay (customize as needed)
    const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    };

    const modalStyles = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
};

export default SignInModal;

