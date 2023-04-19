# Secreto Client 😎 -- gurpreet

The Web Client for the [Secreto-Server](https://gitlab.com/k2511/secreto-server) which allows you to manage secrets in Kubernetes.
The Secreto-Client provides a minimalistic approach to Creating, Viewing, and Deleting Kubernetes Secrets.

**Note:** This microservice has been made with learning
in mind. Please see the following blogs to learn more about
building applications with Kubernetes client-go:

- [Build, Test, and Automate a Kubernetes Interfacing Application in Go](https://awkwardferny.medium.com/build-test-and-automate-a-kubernetes-interfacing-application-in-go-da71e4d5aaef)
- [Adding a Minimalistic ReactJS UI to your Kubernetes Application](https://awkwardferny.medium.com/adding-a-minimalistic-reactjs-ui-to-your-kubernetes-application-d4e1859d312b)

## Usage

With the Secreto-Client you can perform the following in a visual way:

- Create secret via form
- Visualize secrets as cards
- View secret payloads
- Delete secret

The gif below show the above in action!

![Secreto Client in Action](images/secreto_client.gif)

The gif displays the following functions:

- Secrets can be seen as Cards
- When Clicking on the Info Button, you can see details on the Secret
- Secrets can be deleted by pressing the Delete Button
- Secret can be created by clicking on the '+' button and submitting required info

## Deployment

This application can be deployed either locally or within a Kubernetes Cluster. 
**Note:** The Kubernetes Server must also be deployed in the same way.

### Local

In order to run locally, we must first clone and deploy the
secreto-server. Instructions can be found [here](https://gitlab.com/k2511/secreto-server/-/blob/main/docs/development.md).

Once the secreto-server is up and running, we can launch this
application by running the following command:

```bash
$ npm install react-scripts -g --silent
$ npm install semantic-ui-react -g --silent
$ npm install axios -g --silent
$ npm install --silent

$ npm start

Compiled successfully!

You can now view client in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://192.168.3.7:3000/

Note that the development build is not optimized.
To create a production build, use npm run build.
```

A window should automatically open containing the
Secreto-Client UI.

### In Cluster

This application can be hosted within a cluster and accessed from
anywhere with the correct configuration. In order to do this, you
can use the helm chart I created [here](https://gitlab.com/k2511/secreto-helm).

**Disclaimer:** This should not be run in production since
secret data is exposed. In a production app, a login would
be required.

---

Project Avatar by <a href="https://unsplash.com/@benwhitephotography?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ben White</a> on <a href="https://unsplash.com/s/photos/secret?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
