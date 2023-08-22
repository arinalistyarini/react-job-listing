export default function Home() {
const { user, onChangeInput, onSubmitForm } = useForm({
email: '',
password: '',
});

return (
<main>
Main page
</main>
);
}
