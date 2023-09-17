#  vaccine registration

### : This Project contain backend code for vaccine registration (similar to that of Arogyasetu Cowin part). 
##

### Requirements :
1) User 
 - Register user (Mandatory fields: Name, PhoneNumber, Age, Pincode, Aadhar No)
 - User can login through his PhoneNumber and password (set during registration)
 - User should be able to see the available time slots on a given day for vaccine registration (first/second dose based on his vaccination status)
 - Users can register a slot for the first/second dose of the vaccine (example: register for 1st dose on 1st June 11 AM).
 - Users should be able to register for the second dose, only after completing their first dose of vaccine. Once the registered time slot is lapsed, the user should be considered as vaccinated for that registered dose (first/second)
 - User can update/change his registered slot, till 24 hours prior to his registered slot time

2)Admin
 -  Login using admin credentials (There won’t be any api for registering the admin. His credentials should be manually created in the database)
 -  Check the total users registered and [filter them by Age/Pincode/Vaccination status (none/First dose completed/All completed)] - Optional
 -  Check the registered slots for the vaccine (first dose /second dose/total) on a given day Vaccine slot details
 -  Assume that vaccination drive is happening only from 1st June ‘21 to 30th June ‘21
 -  Timings of the vaccine : 10 AM to 5 PM everyday
 -  Each vaccine slot will be of duration 30 minutes. (So slots will be like 10:00 AM to 10:30 AM, 10:30 AM to 11:00 AM etc)
 -  In each vaccine slot there will be 10 vaccine doses available (vaccine dose is same for first/second doses. So both users with first dose or second dose can register).
 -  So total available vaccine doses => 30*14*10 => 4,200
 -  Once 10 vaccine doses in a slot is registered, that time slot shouldn’t be available for further registrations (unless the registered user modifies his time slot to a different slot)
 ##


### Teck Stack :
 - NodeJs
 - Express
 - Mongodb
 
 ##

### Model :
 - UserModel
 - AdminModel
 - SlotCreationModel
 - VaccineRegistrationModeL
 ##

 ## API :
1)  POST - api/user/register : this api contain create operation where user can register himself with given details
2)  POST - api/user/login : user can login with given details like phone number and password  we have useed jwt for authorisation and authentication.
3)  POST - api/user/registerVaccine  : user can check available slot and after that they can book thier appointment for vaccination
4)  PUT - api/user/updateSlot - user can also able to update r change the slot date and time but only before completing 24 hour
5)  GET - api/user/availableSlot - with this api it can find all the available slot for user
6)  POST - api/admin/login - this api for only admin and admin can login so he can check further operations
7)  POST - api/admin/createSlot -  in this api admin can open  vaccine slot for an particular time
8)  GET - api/admin/totalRegistered - in this api admin can find out total registered user for vaccination and also he can filtered the user according to the cryteria.
   


   
      
   
