import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Grid, Text, Button } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import NotFoundImage from './404-image.png'; // Import your 404 image
import { NothingFoundBackground } from '@/components/404/NothingFoundBackground';

function Settings() {
  return (
    <>
      <NothingFoundBackground />
    </>
  );
}

export default Settings;
