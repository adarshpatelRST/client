import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Paper, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CategoryIcon from '@mui/icons-material/Category';
import SecurityIcon from '@mui/icons-material/Security';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MapIcon from '@mui/icons-material/Map';
import '../App.css';

const sections = [
  { title: 'Manage Users', path: '/manage-users', icon: <PeopleIcon /> },
  { title: 'Manage Agreements', path: '/manage-agreements', icon: <AssignmentIcon /> },
  { title: 'Manage Agreement Categories', path: '/manage-agreement-categories', icon: <CategoryIcon /> },
  { title: 'Manage Coverages', path: '/manage-coverages', icon: <SecurityIcon /> },
  { title: 'Manage Tariffs', path: '/manage-tariffs', icon: <AttachMoneyIcon /> },
  { title: 'Manage Tariff-Coverage Mappings', path: '/manage-tariff-coverage-mappers', icon: <MapIcon /> },
];

const Home = () => {
  return (
    <Container className="home">
      <Typography variant="h2" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {sections.map((section) => (
          <Grid item xs={12} sm={6} md={4} key={section.title}>
            <Link to={section.path} className="home-link">
              <Paper elevation={3} className="home-card">
                {section.icon}
                <Typography variant="h5" component="h3">
                  {section.title}
                </Typography>
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
