# Chat

This is a simple web-based chat (as simple as I could make it): there's no secure
account registration, no separate chat rooms, no direct messages or text formatting:
just a single list of one-line text messages.

## Design decisions

The front-end part is implemented in React. The user is first prompted to enter
a username, at which time an UUID is automatically generated on the client side
for them. This is needed to distinguish the user's own messages from everyone
else's, and display them in a different style.

On the back-end side, we have a RESTful API with two endpoints: `/register`, which
sets a cookie for the user, to identify it on the server on subsequent requests,
and `/messages`, which returns the list of messages on the server in chronological
order on GET, or adds a new one on PUT.

The web server runs on Flask, and the messages themselves are stored in a sqlite
database, because we're not expecting high workloads, and because support for
sqlite is built-in into Python.

## Further steps

* Currently, the application is querying the `/messages` endpoint repeatedly to
retrieve the latest messages. This can be replaced by a persistent WebSocket
connection which is updated from the server side.

* The user might want to see browser notifications whenever new messages arrive.

* When loading the initial list of messages, we don't need to retrieve the whole
history, but instead retrieve a page or two of messages, and load the others on
demand while the user scrolls.