import { Desktop } from '@wxcc-desktop/sdk';

// This is the logger initializer factory method for the headless widget
export const logger = Desktop.logger.createLogger('ccagent_out-aa'); 

// Some sample data points

customElements.define(
  'ccagent-out-aa',
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

  // Mounting the headless widget and initializing
  async connectedCallback() 
  {
    this.init(); 
    logger.info('Headless Widget Log: Webcomponent connectedCallback function');
  }
  
  // Init Method - called to configure the WebexCC Desktop JS SDK inside the headless widget
  async init() 
  {  
    await Desktop.config.init();
    logger.info('Headless Widget Log: init function');
    this.registerEventListeners();
    //this.detectlocked();
  }
  // This method registers all the event listeners supported by the JS SDK.
  // The event listeners are asynchronous and require handlers within each of the listeners.
  // Sample handlers below are only console logs as examples
  async registerEventListeners()
  {
    // Listener for agent contact offered event
    Desktop.agentContact.addEventListener('eAgentOfferContact', (agentContact) => {
      logger.info('Headless Widget Log: Agent Offered Contact' +agentContact.data['interaction'].callAssociatedDetails.ani);
      autoanswer(agentContact);
    });
  } 	
});

async function getToken(){
    const actoken = await Desktop.actions.getToken();
    logger.info("agent-history", "getToken" +actoken);
    // Versuche Token aus dem Desktop SDK zu holen, fallback auf bottoken-Konstante
    
    return actoken;
  }

async function autoanswer(agentContact){
            logger.info('Auto Answer' +agentContact);
            let token = await getToken();
            var URL = "https://webexapis.com/v1/telephony/calls";
            const response1 = await fetch(URL, {
              headers: {Authorization: 'Bearer '+token}
            });
            const opencalls = await response1.json();
            const opencallid = opencalls.items[0].id;
            console.log("CallID:" +opencallid);
    
            var URL = "https://webexapis.com/v1/telephony/calls/answer";
            const response11 = await fetch(URL, {
              method: 'POST',
              headers: {Authorization: 'Bearer '+token, 'Content-Type': 'application/json'},
              body: JSON.stringify({callId: opencallid})
            });
            const userstatus1 = await response11.json();
            console.log(userstatus1);
}


