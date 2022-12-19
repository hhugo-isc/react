import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "./../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list og highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   //fetch data from API

//   //   const req = context.req;
//   //   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  // Fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://NEXTJS_USER:hqO3rS2ZMCiJWavO@cluster0.zciup5z.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const collection = db.collection("meetups");

  const meetups = await collection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
  };
}

export default HomePage;
