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
