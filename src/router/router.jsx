import {
  createBrowserRouter,
  
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import JobDetails from "../pages/JobDetails";
import PrivateRoute from "./PrivateRoute";
import JobApply from "../pages/JobApply";
import MyApplications from "../pages/MyApplications";
import AddJob from "../pages/AddJob/AddJob";
import CategoryJobs from "../pages/CategoryJobs";
import AllCompanies from "../pages/AllCompanies";
import CompanyJobs from "../pages/CompanyJobs";
import SearchResults from "../pages/SearchResults";
import MyPostedJobs from "../pages/MyPostedJobs";
import AllJobs from "../pages/AllJobs";
import ViewApplications from "../pages/ViewApplications";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <h2> Route not found </h2>,
    children: [
        {
            index: true,
            element: <Home></Home>
        },
        {
  path: '/jobs/category/:categoryName',
  element: <PrivateRoute> <CategoryJobs></CategoryJobs>            </PrivateRoute>
},


        {
                path: '/jobs/:id',
                element: <PrivateRoute> <JobDetails></JobDetails>    </PrivateRoute>


        },
        {
             path:'/jobs',
             element: <PrivateRoute> <AllJobs></AllJobs> </PrivateRoute>
        },
         {
          path: '/jobapply/:id',
          element: <PrivateRoute> <JobApply></JobApply> </PrivateRoute>
         },
         {
          path: '/companies',
          element:  <AllCompanies></AllCompanies> 

         },
         {
     path: '/companies/:companyName',
     element: <PrivateRoute> <CompanyJobs></CompanyJobs> </PrivateRoute>
     },
         
            {
              path: '/myapplications',
              element: <PrivateRoute> <MyApplications> </MyApplications> </PrivateRoute>
            },
            {
              path: '/viewApplications/:job_id',
              element: <PrivateRoute> <ViewApplications></ViewApplications>     </PrivateRoute>


            },

            {
              path: '/addJob',
              element: <PrivateRoute> <AddJob></AddJob>  </PrivateRoute>
            },
            {
                 path: '/myPostedJobs',
                 element: <PrivateRoute> <MyPostedJobs></MyPostedJobs> </PrivateRoute>
            }, 
            {
               path: '/search',
            element: <PrivateRoute> <SearchResults></SearchResults>          </PrivateRoute>

            },

        {
            path: '/signup',
            element: <SignUp></SignUp>
        },
        {
            path: '/signin',
            element: <SignIn></SignIn>
        }
    ]
  },
]);

export default router;
