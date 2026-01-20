
import React from 'react';
// Fixing react-router-dom imports to use standard v6 exports directly
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Programs } from './pages/Programs';
import { ProgramDetail } from './pages/ProgramDetail';
import { Impact } from './pages/Impact';
import { GetInvolved } from './pages/GetInvolved';
import { Contact } from './pages/Contact';
import { Donate } from './pages/Donate';
import { News } from './pages/News';
import { NewsDetail } from './pages/NewsDetail';
import { Projects } from './pages/Projects';
import { Gallery } from './pages/Gallery';
import { ProjectReport } from './pages/ProjectReport';
import { ProjectManagement } from './pages/ProjectManagement';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { MockDataProvider } from './context/MockDataContext';

const App: React.FC = () => {
  return (
    <MockDataProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/program/:id" element={<ProgramDetail />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/project-report/:projectId" element={<ProjectReport />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/project/:projectId" element={<ProjectManagement />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </HashRouter>
    </MockDataProvider>
  );
};

export default App;
