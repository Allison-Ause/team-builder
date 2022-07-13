

export default function createAddTeam(form, { handleAddTeam }) {
    const fileInput = form.querySelector('input[type=file]');
    const preview = form.querySelector('img');

    fileInput.addEventListener('change', () => {
        const [file] = fileInput.files;
        preview.src = URL.createObjectURL(file);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        handleAddTeam(
            formData.get('team-name'),
            formData.get('emblem')
        );
        console.log(formData.get('name'));

        form.reset();
    });

    return () => {
        
    };
}