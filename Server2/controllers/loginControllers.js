const loginService = require('../services/loginService');

class loginControllers {
    async getPsw(req, res, next) {
        try {
            const id = req.params.userId;
            const result = await loginService.getPsw(id);
            if (!result) {
                res.status(404).send('Not found');
            } else {
                res.status(200).send(result);
            }
        } catch (err) {
            console.error(err);
            if (err.kind === 'ObjectId') {
                res.status(400).send('Invalid ID');
            } else {
                console.log("error in controlers getById")
                res.status(500).send('Internal Server Error');
            }
        }
        }
        catch (err) {
        }

    async getByUserId(req, res, next) {
        try {
          const id = req.params.userId; // Get userId from params
          const password = req.body.password; // Get password from request body
          console.log(`profile= ${req.session.profile}`);
        if (!id || !password) {
            return res.status(400).json({ success: false, message: 'User ID and password are required' });
        }
          const result = await loginService.getByUserId(id, password); // Call the updated service function
    
          // Handle different validation results
          if (result.success) {
            res.status(200).send(result); // Send user details if success
          } else {
            // Determine the appropriate status code based on the message
            const statusCode = result.message === 'Incorrect password' ? 401 : // Unauthorized
                              result.message === 'Invalid password' ? 403 : // Forbidden
                              result.message === 'Maximum number of attempts' ? 429 : // Too Many Requests
                              500; // Internal Server Error for other errors
            res.status(statusCode).send(result.message);
          }
        } catch (err) {
          // Handle general errors
          console.error(err);
          res.status(500).send('Internal Server Error');
        }
      }
    }
    

   


module.exports = new loginControllers(loginService);