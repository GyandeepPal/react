import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import Header from "./Components/Header"
import Hero from "./Components/Hero"
import Notices from "./Components/Notices"
import QuickLinks from "./Components/QuickLinks"
import Recruitment from "./Components/Recruitment"
import Tenders from "./Components/Tenders"
import Footer from "./Components/Footer"

import NoticesPage from "./Components/NoticesPage"
import RecruitmentsPage from "./Components/RecruitmentsPage"
import TendersPage from "./Components/TendersPage"

import AboutPage from "./Components/AboutPage"
import DepartmentsPage from "./Components/DepartmentsPage"
import ContactPage from "./Components/ContactPage"

import Admin from "./Components/Admin"
import AdminLogin from "./Components/AdminLogin"

import TrainServicesPage from "./Components/TrainServicesPage"
import PassengerInformationPage from "./Components/PassengerInformationPage"

import SearchPage from "./Components/SearchPage"
import RailwayStats from "./Components/RailwayStats"

import Gallery from "./Components/Gallery"


function Home() {
  return (
    <div className="min-h-screen w-full bg-gray-100">

      {/* Header */}
      <Header />

      {/* Hero */}
      <Hero />

      {/* Latest Notices */}
      <Notices />


      {/* Quick Access */}
      <QuickLinks />

      {/* Recruitment */}
      <Recruitment />

      {/* Tenders */}
      <Tenders />

      {/* Railway Gallery */}
      <Gallery />
      
      {/* Railway Statistics */}
      <RailwayStats />



      {/* Footer */}
      <Footer />

    </div>
  )
}



function ProtectedAdmin() {
  const token = localStorage.getItem("adminToken")

  if (!token) {
    return <Navigate to="/admin-login" />
  }

  return <Admin />
}


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<AboutPage />}
        />

        <Route
          path="/departments"
          element={<DepartmentsPage />}
        />

        <Route
          path="/contact"
          element={<ContactPage />}
        />

        <Route
          path="/notices"
          element={<NoticesPage />}
        />

        <Route
          path="/recruitments"
          element={<RecruitmentsPage />}
        />

        <Route
          path="/tenders"
          element={<TendersPage />}
        />

        <Route
          path="/train-services"
          element={<TrainServicesPage />}
        />

        <Route
          path="/passenger-information"
          element={<PassengerInformationPage />}
        />

        <Route
          path="/search"
          element={<SearchPage />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={<ProtectedAdmin />}
        />

      </Routes>

    </BrowserRouter>
  )
}


export default App
