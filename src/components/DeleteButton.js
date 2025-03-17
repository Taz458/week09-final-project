'use client'; // This marks the component as a client-side component

export default function DeleteButton({ gameId, deleteGame }) {
    // Handle the button click to trigger the deletion
    const handleDelete = () => {
        // Call the server-side delete function
        deleteGame(gameId);
    };

    return (
        <button 
            onClick={handleDelete} 
            type="button" 
            style={{
                background: "red", 
                color: "white", 
                border: "none", 
                padding: "8px 12px", 
                marginTop: "10px", 
                cursor: "pointer", 
                borderRadius: "4px"
            }}
        >
            Delete
        </button>
    );
}
