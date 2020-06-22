# StudentFirst REST API
An attempt to make a responsive, student-oriented application similar to the CUNYFirst system, with emphasis on ease of use and a modern UI.

## Student Endpoints
[Get a Student's Account](/routes/docs/students/getstudent.md)\
![](https://img.shields.io/badge/%2Fapi%2Fstudents%2F%3Auid-GET-brightgreen?style=flat-square) 

[Create a New Student Account](/routes/docs/students/createstudent.md)\
![](https://img.shields.io/badge/%2Fapi%2Fstudents-POST-blue?style=flat-square)

[Add a New Course to Student's Account](/routes/docs/students/addcourse.md)\
![](https://img.shields.io/badge/%2Fapi%2Fstudents%2F%3Auid%2Faddcourse-PUT-orange?style=flat-square)

[Remove Course from Student's Account](/routes/docs/students/removecourse.md)\
![](https://img.shields.io/badge/%2Fapi%2Fstudents%2F%3Auid%2Fremovecourse-PUT-orange?style=flat-square)

[Swapping Courses in Student's Account](/routes/docs/students/swapcourses.md)\
![](https://img.shields.io/badge/%2Fapi%2Fstudents%2F%3Auid%2Fswapcourses-PUT-orange?style=flat-square)

## Courses Endpoints
[Get All Courses](/routes/docs/courses/getcourses.md)\
![](https://img.shields.io/badge/%2Fapi%2Fcourses-GET-brightgreen?style=flat-square)

*[Get Courses by Search](/routes/docs/courses/getsearchedcourses.md)*\
![](https://img.shields.io/badge/%2Fapi%2Fcourses/search-GET-green?style=flat-square) ![Deprecating](https://img.shields.io/badge/-Deprecating-red?style=flat-square)

~~[Get Course by ID]()~~ **[Deprecated]**\
![](https://img.shields.io/badge/%2Fapi%2Fcourses%2Fid%2F%3Auid-GET-lightgrey?style=flat-square)\
Soon to be replaced by\
![](https://img.shields.io/badge/%2Fapi%2Fcourses%2F%3Auid-GET-green?style=flat-square)

~~[Get All Departments]()~~ **[Deprecated]**\
![](https://img.shields.io/badge/%2Fapi%2Fcourses%2FallDepartment-GET-lightgrey?style=flat-square)\
Soon to be replaced by\
![](https://img.shields.io/badge/%2Fapi%2Fcourses%2Fdepartments-GET-green?style=flat-square)

~~[Get Department by Name]()~~ **[Deprecated]**\
![](https://img.shields.io/badge/%2Fapi%2Fcourses%2FallDepartment%2F%3AdptName-GET-lightgrey?style=flat-square)\
Soon to be replaced by\
![](https://img.shields.io/badge/%2Fapi%2Fcourses%2Fdepartments%2F%3AdptId-GET-green?style=flat-square)

## Professors Endpoints

[Get Comments on Professors](/routes/docs/professors/getcomments.md)\
![](https://img.shields.io/badge/%2Fapi%2Fprofessors%2FgetComments-GET-brightgreen?style=flat-square)