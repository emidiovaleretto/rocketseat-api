const AppError = require("../utils/AppError")

class UsersController {

    /**
     * index: GET method to list data.
     * show: GET method to show an specific data
     * create: POST method to create a data
     * update: PUT method to update a data
     * delete: DELETE method to remove a data
    */

    create(request, response) {
        const { name, email, password } = request.body

        if (!name) {
            throw new AppError("Name is required.")
        }

        response.status(201).json({ name, email, password })
      
    }
    
}

module.exports = UsersController;