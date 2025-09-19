# API experiment

The Johann von Neumann (JVN)-inspired chatbot project was a fun way to learn how to design APIs to get work done in a context that I, as a technical writer, could relate to.

I imagined several transactions that a brilliant but cranky chatbot might create in response to getting bored with poeple's questinos. I worked with Claude AI anto make a solid Javascript application. Then I worked with Claude to extract the API documentation into an OpenAPI specification format.

As long as the API documentation meets OpenAPI standards, you can use Redocusuarus in your existing Docusaurus project to generate nicely formatted API documentation. To do this, you install Redocusaurus locally and then expose a Redocusaurus preset that calls the API configuration file within the Docusaurus configuration. I set the formatting of the API documentation to use the custom fonts I use in my Docusaurus project. To learn about Redocusaurus, see [Redocusaurus](https://redocusaurus.vercel.app/docs/). 

To see the JVN chatbot API documentation, click [JVN Chatbot API (1.0.0)](/api/jvn-chatbot). 

To learn about how we designed the JVN chatbot to work using API-based transactions, see [Understanding JVN: Personality and Game Mechanics](/docs/my-docs/jvn-personality-guide).
