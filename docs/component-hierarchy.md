**Bolded** components are associated with routes.

Bolded routes are created by their associated routes, so the nesting of bolded components _**exactly**_ match the nesting of the routes.

* **App**
  * NavBar
    * IndexPageLink
    * **SearchBarContainer**
  **AuthFormContainer**
    * Sign In Form (only for administrators)
  * **ProgramsFeedContainer**
    * **ProgramItem Component**
      * Photo
      * Name
      * Location
      * Details
  * **UploadProgramContainer**
    * Photo
    * Name
    * Location
    * Details

## Routes
|       Path       |       Component
|------------------|--------------------------------
|  '/log-in'       |   "AuthForm Container"
|  '/programs'     |   "ProgramsFeed Container"
|  '/new-program'  |   "UploadProgram Container"
