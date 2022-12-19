import { ObjectID } from "bson";
import { MongoClient } from "mongodb";
import MeetupDetail from "./../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://NEXTJS_USER:hqO3rS2ZMCiJWavO@cluster0.zciup5z.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const collection = db.collection("meetups");
  const meetups = await collection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://NEXTJS_USER:hqO3rS2ZMCiJWavO@cluster0.zciup5z.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const collection = db.collection("meetups");
  const selectedMeetup = await collection.findOne({
    _id: ObjectID(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
