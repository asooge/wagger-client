# Wagger-client
![Website](https://i.imgur.com/OzaCqhE.jpg)

[API](https://protected-beach-93259.herokuapp.com/)

[Website](https://asooge.github.io/wagger-client/)

[Client Github](https://github.com/asooge/wagger-client)

[API Github](https://github.com/asooge/wagger-api)

Wagger is an app for dogs to meet other dogs to play with. In today's busy society, most dogs
don't have owners who can play with them for hours upon hours every day. That's where Wagger
comes in. Create a profile and meet other dogs in your area that will be your perfect
playmate. View your profile and update every aspect to make sure you're putting your
best paw forward.

Planning for this project, I really wanted to focus of the app to be on the dog, and
not the owner. That's why the app prompts the user to upload images of the dog, and
not themselves. However, users are allowed to upload one picture of themselves with
the dog to help the owners feel more comfortable with each other, but this image is only
available to users you match with. I didn't want users to use this app as a 'dating'
app, but rather a way to find friends for your dog, and also meet like-minded people
along the way.

I also wanted the user-interface to be simple and easy to use. Sign up automatically
signs the user in on success, and immediately prompts them to provide info on their
dog profile including name, speak, and images. Once the profile is complete, the user
is immediately taken to the main route '/wagger' which is the matching part of the app.

Five dogs are immediately selected and displayed for the user, one at a time. The
user can read the dog name, speak field, and browse the dog images so they can decide
if it will be a match. If yes, a request is sent to the api to create the 'like' and
also determine if its a match. This logic is done on the backend, and simply checks if
the other dog also like the user. If so, it creates a match and returns the user
information with the new match.

The client can then see the new match and take the user directly to the match component
/'match/:id'
Inside the match component, the user can now see the match's profile picture which
shows the owner with the dog. They can also see the dog images and message the match.
Finally, if the match was a mistake or

At anytime, the user can see their own full profile '/profile' in order to make updates to any
field, including images. They can also change their password and sign out from this
view.

After the user has made a decision on each of the 5 dogs, the app advises that
you have reached your limit. A timer is displayed which counts down 24 hours from
the last pull, which is recorded on the backend when it provided the 5 dogs.

Provided user interest and demand, there are many features of this app I would like
to continue developing. Messaging could be improved by adding real-time chat using
something like socket.io. I would also like to integrate Google maps api for location
to find users in your proximity. Users would be able to decide what radius to search
for dogs. Also, would like to create a component where users can buy bones. Bones can
be 'thrown' to get five additional dogs without having to wait 24 hours.

```
User Stories

As a user, I would like to quickly and easily create a profile
As a user, I would like to upload images directly from my computer
As a user, I would like to view other profiles and determine if they would be a match
As a user, I would like to see my full profile, and make changes as I see fit
As a user, I would like to view all my matches
As a user, I would like to be able to message my match
As a user, I would like to be able to delete matches if neccessary
As a user, I would like to have unlimited dog profiles, or at least know when I can view additonal dogs
As a user, I would like an intuitive interface where I can easily navigate from one view to another.
As a user, I would like to be able to sign out, and continue from where I left off when I sign back in.
```

![wireframe1](https://i.imgur.com/C9lN4Ct.jpg)
![wireframe2](https://i.imgur.com/S2pY6hH.jpg)
![wireframe3](https://i.imgur.com/Y8Qd85x.jpg)

## Getting Started

Download a copy of the repo and install dependencies with npm install to get a
copy running on your local machine, or simply access the deployed site at https://asooge.github.io/wagger-client/

## Built With

* [React.js](https://reactjs.org/) - Front-end framework, using hooks and react-router-dom
* [AWS S3](https://aws.amazon.com/s3/) - File storage for images.
