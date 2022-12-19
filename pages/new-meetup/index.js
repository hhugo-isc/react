//our-domain/new-meetup
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";

const NewMeetupPage = () => {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    const { title, address, image, description } = enteredMeetupData;
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify({ title, address, image, description }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    router.push("/");
  }
  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetupPage;
