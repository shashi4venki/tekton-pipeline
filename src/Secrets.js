import React, {Component} from "react";
import axios from "axios"
import { Icon, Popup, Card, Form, Button, Header } from "semantic-ui-react"

class Secrets extends Component {
    constructor(props) {
      super(props);
  
      var host = "http://localhost:8080";

      if (process.env.NODE_ENV === 'production') {
        if ("REACT_APP_SECRETO_SERVER_HOST" in process.env) {
          host = process.env.REACT_APP_SECRETO_SERVER_HOST;
          console.log('host overwritten to ' + host); 
        }
      }

      console.log(process.env)

      // Where the axios request is sent
      this.endpoint = host; // default: http://localhost:8080
      console.log(this.endpoint);
  
      this.state = {
        // items = list of all secrets
        items: [],

        // states for the submit form when adding
        // a secret
        submitName: '',
        submitNamespace: '',
        submitPayload: '',
      };
    }
  
    // automatically runs this function on load
    componentDidMount() {
      this.getSecrets();
    }

    // Set the state depending on the item I'm on
    onChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };

    // List all secrets
    getSecrets = () => {
        // run a get on the endpoint
        axios.get(this.endpoint + "/api/secreto").then(res => {
        console.log(res);

        // if there's data, let's load it
        if (res.data) {
            this.setState({
            items: res.data.map(item => {
                this.describeSecret(item)
                return (
                <Card color='green'>
                  <Card.Content>
                    <Card.Header textAlign="left">
                        {/* Load the 'name' component of the returned json 
                        from item (the struct). This loads all secrets by
                        name */}
                        <div style={{ wordWrap: "break-word" }}>{item.name}</div>
                    </Card.Header>

                    {/* Load all the namespaces */}
                    <Card.Meta textAlign="left">
                      <span>{item.namespace}</span>
                    </Card.Meta>

                    <Card.Meta textAlign="right">
                      {/* Opens a Popup when the Icon is clicked */}
                      
                      <Popup
                        // This makes the popup come out
                        trigger={
                          <Icon 
                            circular name='eye'
                            color='grey'
                          />
                        }
                        
                        // Loads content from function return 
                        content={() => this.renderDescribeForm(item)}
                        size='large'
                        on='click'
                      >
                      </Popup>

                      <Icon
                        circular name="delete"
                        color="red"
                        onClick={() => this.deleteSecret(item)}
                      />

                    </Card.Meta>
                  </Card.Content>
                </Card>
                );
            })
            });
        } else {
            // no items found
            this.setState({
            items: []
            });
        }
        });
    };

    // Gets the secret we clicked on and returns it's date
    // and payload if there is any. This is called from
    // the popup
    describeSecret = (item) => {
      axios.get(this.endpoint + "/api/secreto/" + item.namespace + "/" + item.name)
      .then(res => {
        console.log(res);

        if (!res.data.payload) {
          item.payload = "Not Avaliable";
        } else {
          item.payload = res.data.payload;
        }
      })
    }

    // Runs the Delete Secret Command and refreshes the view
    deleteSecret = (item) => {
      axios
        .delete(this.endpoint + "/api/secreto/" + item.namespace + "/" + item.name, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then(res => {
          console.log(res);
          this.getSecrets();
        }).catch(err => {
          console.log(err);
        });
    };

    // Create a Secret from Form data
    createSecret = () => {
      // Grabs items from state which have been altered by
      // the form in render
      const {name, namespace, payload} = this.state
      
      axios.post(this.endpoint + "/api/secreto/" + namespace,
        {
          "name": name, 
          "payload": payload
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
        ).then(res => {
          console.log(res);
          this.getSecrets();
      })
    }

    // Displays a Spinner while a Secret is Loading
    // Loads the Secret in a while statement
    renderDescribeForm = (item) => {
       return (
        <Form>
         <h4>Date Created</h4>
         <p>{item.date}</p>
         <h4>Payload</h4>
         <p>{item.payload}</p>
        </Form>
       );
     }

    // Renders the Create Secret Form
    renderSubmitForm = () => {

      const { name, namespace, payload } = this.state
      
      return (
        <Form>
          <Form.Field required>
            <input
              placeholder='name'
              name='name'
              value={name}
              // alters the state of the name
              onChange={this.onChange}>
            </input>
          </Form.Field>
          <Form.Field required>
            <input
              placeholder='namespace'
              name='namespace'
              value={namespace}
              onChange={this.onChange}>
            </input>
          </Form.Field>
          <Form.Field required>
            <input
              placeholder='payload'
              name='payload'
              value={payload}
              onChange={this.onChange}>
            </input>
          </Form.Field>
          <Form.Field>
            {/* Make sure () not included so that it doesn't auto-submit */}
            <Button type='submit' onClick={this.createSecret}>Submit</Button>
          </Form.Field>
        </Form>
      )
    }

    // Renders the main view
    render() {
        return (
          <div>
            <div className="row">
              <Header className="header" as="h2">
                <b>Secretos </b>
              </Header>
            </div>
          <br></br>
            <div className="row">
              <Popup
                // This makes the popup come out
                trigger={
                  <Icon 
                    circular name='add'
                    color='grey'
                  />
                }
                // Renders a Form with fields needed for Secret Creation
                content={() => this.renderSubmitForm()}
                size='large'
                on='click'
                position='bottom center'
              >
              </Popup>
            </div>
          <br></br>
            <div className="row">
              <Card.Group centered>{this.state.items}</Card.Group>
            </div>
          </div>
        );
      }
    }
    
    export default Secrets;