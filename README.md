# TodoApp_Nodejs
<h1>Todo web app using Nodejs</h1>
<p>In this app i implemented all CRUD operations with email service</p>
<h3>List of modules used</h3>
<ul>
  <li>1. express</li>
  <li>2. body-parser</li>
  <li>3. jsonwebtoken</li>
  <li>4. passport</li>
  <li>5. passport-jwt</li>
  <li>6. express</li>
  <li>7. nodemailer</li>
  <li>8. mongoose</li>
  <li>9. cookie-parser</li>
  <li>10.bcryptjs</li>
  <li>11. nodemon</li>
</ul>
<h3>Authentication</h3>
<p>I made authentication and authorization using passportjs middleware</p>
<p>In passportJs i used the jwt-strategy to verify the token for every subsequent request of client after login</p>
<h2>The flow of the App is</h2>
<p>First by starting the express server with nodemon</p>
<p>Then in browser you have to go localhost:3000/auth/</p>
<p>So by clicking on register button you will redirected to the register page</p>
<p>After filling the details and clicking on register button you get an mail from nodemailer module to acknowledge that you registered successfully</p>
<p>So by clicking on login button that route is take you to login page after entering your credentials you will be authenticated via passport.authenticate() middleware</p>
<p>This passport.authenticate() method takes two paramters one is strategy name i.e what you are using and another based on strategies second param will change</p>
<p>This passport.authenticate() method invoke the our configuration file which is written for verify the user wheather the user have access to that resource</p>
<p>So from here for every route is private route</p>
<h3>Todo app operations</h3>
<p>You can add the todo task</p>
<p>You can delete that task</p>
<p>The tasks you added you can view them</p>
<p>Update those taskes</p>
<h3>So why i used cookie-parser??</h3>
<p>The reason behind to use cookie-parser to parse the cookie from request</p>
<p>So by installing cookie-parser module,That gives you cookies object in request object</p>
<p>So when ever user was successfully authenticated i will create a jwt token and set the cookie and after successfully authentication for the first response</p>
<p>I will attach the cookie and give response back to browser,So then browser will store the cookie in it's respone header</p>
<p>So for next request from client that response header cookie will assigned to the request header set cookie,So now onwards for every request the cookie was attached to that request</p>
<p>So it was private route means then i will extract the cookie from the req.cookies.name_cookie</p>
<p>And verify with me strategy</p>
<p>So cookie parser module gives req.cookies.cookie_name by using this we can extract cookie and verify the user</p>


