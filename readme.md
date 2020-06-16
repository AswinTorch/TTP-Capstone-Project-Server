# Endpoints that can be used for CRUD operations.
----------------------------------
## Courses
`/courses`
     
     Gives all the json object all the courses with id as key and an object with course information 
     Example:
     {
    "P92muHq2SVlqzs5wHx6Y": {
        "Career": "Undergraduate",
        "Description": "4 hours; 4 credits\nIntroduction to financial and managerial accounting for students not intending to be accounting or finance majors. Accounting and finance majors must take ACCT 2001. Financial topics include a user’s perspective of collecting and organizing information, accounting for accruals and deferrals, accounting for key balance sheet and income statement accounts, and understanding internal controls and basic financial statement analysis tools. Managerial accounting topics include cost behavior, leverage, cost accumulation, budgeting, and performance analysis.",
        "Semester_Offered": "All Terms",
        "Campus_Name": "Brooklyn College",
        "Course_ID": "ACCT. 2002",
        "Course_Name": "Survey of Accounting",
        "Units": "4.00",
        "Department": "Accounting"
    },
    "ZbqJfa497aQVpbrqJRoT": {
        "Semester_Offered": "Fall, Spring",
        "Campus_Name": "Brooklyn College",
        "Description": "4 hrs;  4 credits\nIntroduction to the concepts and principles of accounting. Techniques of data accumulation. Nature and interpretation of financial statements. Corporate accounting. (Not open to students who have completed Economics 71.01 or 71.1.) Fall and spring terms.",
        "Course_Name": "Introductory Accounting",
        "Course_ID": "ACCT. 2001",
        "Career": "Undergraduate",
        "Department": "Accounting",
        "Units": "4.00"
        }
    }
`/courses/id/:id`

    Gives the campus object. That correspond to the id
    Exmaple for(courses/id/vxlC2mHFgr5K82bwrY66):
    {
    "Units": "3.00",
    "Career": "Undergraduate",
    "Semester_Offered": "All Terms",
    "Campus_Name": "Brooklyn College",
    "Department": "Business",
    "Course_ID": "BUSN. 4101W",
    "Description": "3 hours; 3 credits\n\nEquips students with marketing decision making skills through case study analysis and demonstrates how to develop a strategic marketing plan.  Emphasis on the integration of marketing research, market segmentation, targeting, and positioning; and product, pricing, distribution, and promotion strategies.  Importance of marketing ethics and corporate social responsibility in decision making. This course is writing-intensive. \nPrerequisite: English 1012.\nPrerequisite or corequisite: Business 3100 and senior standing",
    "Course_Name": "Seminar in Strategic Marketing Management"
    }
`/courses/allDpt/`

    Returns a list of all the department available on the database:
    Example:
    [
    "Accounting",
    "Business"
    ]

`/courses/allDpt/:dptName`
    
    Returns all the courses obj that fall under that department
    For Example (/courses/allDpt/Accounting):
    [
    {
        "Course_Name": "Survey of Accounting",
        "Career": "Undergraduate",
        "Units": "4.00",
        "Department": "Accounting",
        "Campus_Name": "Brooklyn College",
        "Semester_Offered": "All Terms",
        "Course_ID": "ACCT. 2002",
        "Description": "4 hours; 4 credits\nIntroduction to financial and managerial accounting for students not intending to be accounting or finance majors. Accounting and finance majors must take ACCT 2001. Financial topics include a user’s perspective of collecting and organizing information, accounting for accruals and deferrals, accounting for key balance sheet and income statement accounts, and understanding internal controls and basic financial statement analysis tools. Managerial accounting topics include cost behavior, leverage, cost accumulation, budgeting, and performance analysis."
    },
    {
        "Career": "Undergraduate",
        "Units": "4.00",
        "Campus_Name": "Brooklyn College",
        "Description": "4 hrs;  4 credits\nIntroduction to the concepts and principles of accounting. Techniques of data accumulation. Nature and interpretation of financial statements. Corporate accounting. (Not open to students who have completed Economics 71.01 or 71.1.) Fall and spring terms.",
        "Semester_Offered": "Fall, Spring",
        "Course_ID": "ACCT. 2001",
        "Department": "Accounting",
        "Course_Name": "Introductory Accounting"
    }
    ]

--------------------------------
## Students
`/id/:id`
    
    GET Operation
    =============
    Returns the student object based on the given parameter(id)
    For example:
        for: localhost:3000/api/students/id/uSkp7UQcc1dVpfrNMu7z 
        --------------------------------------------------------
        {
        "enrolled_classes": [
            "P92muHq2SVlqzs5wHx6Y"
        ],
        "email": "oksy@kk.com",
        "first_name": "John",
        "total_owed": 0,
        "uid": "2000000",
        "total_received": 0,
        "last_name": "Okay"
        }
`/`
    
    POST Operation
    =============
    input_obj ={
        UID: unique_id_on_google_auth,
        firstName: Pretty selfexplanatory,
        lastName: Pretty selfexplanatory,
        emailAddress: Pretty selfexplanatory,
    }
    Returns the id of new doc create for student 
    For example:
        for: localhost:3000/
        req.body->{
            "UID": 20000001,
            "firstName": "Hos",
            "lastName": "Du",
            "emailAddress": "selfexplanatory@pretty.com"
        }
        --------------------------------------------------------
        RESULT -> 25znrP0KfFwlFIpLpomK (THE ID OF NEW STUDENT DOC)
`/addCourse/:id`
    
    PUT Operation
    =============
    Takes in input_obj={
        CourseID : ID_OF_COURSE
    }
    param: id_of_student
    return nothing except 201 and a sucess msg.
`/addCourse/:id`
    
    PUT Operation
    =============
    Takes in input_obj={
        CourseID : ID_OF_COURSE
    }
    param: id_of_student
    return nothing except 201 and a sucess msg.

`/exists/:uid`
    
    
    GET Operation
    =============
    This is to check if the account exists during login or not
    returns false in not found and returns [true, students_id] if found
    For example:
        localhost:3000/api/students/exists/20000000
        -> Returns [false]
        localhost:3000/api/students/exists/"20s2"
        -> Returns [
                    [
                        true,
                        "uSkp7UQcc1dVpfrNMu7z"
                    ]
                ]