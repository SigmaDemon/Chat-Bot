import { ApiAiClient } from "api-ai-javascript"; // this import statement performs the API call for the client and communicate with the service
import { applyMiddleware, createStore } from "redux"; // this imports the message storing properties from the redux library installed

// The two variables below are used to specify the client and its access token
// These security keys are taken from the DialogFlow website from an implemented account
const accessToken = "6af63f6ddd1a4d2092fcb33a4c940ac3";
const client = new ApiAiClient({ accessToken });

// This event can happen either on the client or the chatbot's side
const ON_MESSAGE = "ON_MESSAGE";

// This is an action cretor where a text will be given and the user can return a message
// It also specifies who is the message sender
export const sendMessage = (text, sender = "user") => ({
  type: ON_MESSAGE,
  payload: { text, sender }
});

// This method creates an action that takes the client and request the text from the client
// Afterwards it dispatches an action after the text was captured successfully
const messageMiddleware = () => next => action => {
  next(action);

  if (action.type === ON_MESSAGE) {
    const { text } = action.payload;

    client.textRequest(text).then(onSuccess);

    // The onSuccess method returns the message speech typed by the chatbot
    // I made it work by writing it EXACTLY LIKE IN THE VIDEO
    function onSuccess(response) {
      const {
        result: { fulfillment }
      } = response;
      next(sendMessage(fulfillment.speech, "bot"));
    }
  }
};

// This function will display a default message that the chatbot will use to greet new users
const initState = [
  { text: "Hello my friend! My name is Chatty, how may I help you today? :)" }
];

// This is a message reducer that returns the action's state using a switch statement
// The initState is added to display the message provided above as default
const messageReducer = (state = initState, action) => {
  switch (action.type) {
    case ON_MESSAGE:
      return [...state, action.payload];

    default:
      return state;
  }
};

// This store function stores the information within the chatbot
export const store = createStore(
  messageReducer,
  applyMiddleware(messageMiddleware)
);
