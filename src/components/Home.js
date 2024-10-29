import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isSuperAdmin } from '../utils';
import DataTable from '../common/DataTable';
import { toast } from 'react-toastify';

const Home = () => {
  return(
    <>
      <p>Dashboard.....</p>
    </>
  )
}

export default Home;