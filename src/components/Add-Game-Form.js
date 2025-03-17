export default function AddGameForm({ handleSubmit }) {
    return (
        <form
            className="flex flex-col w-80 mx-auto space-y-3 p-4 border rounded-lg shadow-md"
            action={handleSubmit}
        >
            <input
            name="name"
            placeholder="Game Name"
            required
            className="p-2 border rounded"
            />
            <input
            name="creator"
            placeholder="Creator"
            required
            className="p-2 border rounded"
            />
            <textarea
            name="description"
            placeholder="Description"
            required
            className="p-2 border rounded"
            />
            <input
            name="released_year"
            placeholder="Released Year"
            required
            type="number"
            className="p-2 border rounded"
            />
            <input
            name="img_url"
            placeholder="Image URL"
            required
            className="p-2 border rounded"
            />
            <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
            Submit
            </button>
        </form>
        );
}