import app from './index';
import serverless from 'serverless-http';

app.listen(5000, ()=>{
    console.log('listening')
})

module.exports.handler = serverless(app);

// article to setup express to be used for lambda - 
// https://bitbucket.org/blog/deploy-an-express-js-app-to-aws-lambda-using-the-serverless-framework
// serverless config credentials --provider aws --key ACCESS_KEY --secret SECRET_KEY
