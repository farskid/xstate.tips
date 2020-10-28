const meta = {
  title:
    "Multistep form handling with Finite State Machines, Formik and TypeScript",
  description:
    "Lately, I had a chance to work on a mobile app that utilizes this concept of finite state machines. Having no prior knowledge on such thing as a state machine, I quickly got to liking it! Basically, the concept of such state machines is that we have a finite number of states and we can transition between these states while also exchanging some data. We can declare multiple machines which can handle different tasks and behave in a different way, as well as declare some universal ones that can be re-used. That being said, we can think of our app as a combination of state machines that, based on their states, render different parts of UI. For example, fetching data from the back-end - we are either in a `fetching` state (we can render some kind of a loader at this time) or in a `done` state where we can display all the fetched data along with some kind of information about our request status, e.g. whether it was successful or not. If you want to start developing an app based on state machines, there’s this cool library called XState - the one that I used in the aforementioned project and got familiar with (but not entirely, at least yet! 🙂).",
  pubDate: "June 17, 2020",
  author: "John Doe",
  url: "/multi-step-form",
};

module.exports.meta = meta;
