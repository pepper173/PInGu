import app from '../init/appInit.js';
import studentAuthRoutes from './studentAuthRoutes.js';
import teacherAuthRoutes from './teacherAuthRoutes.js';
import h5pRoutes from './h5pRoutes.js';
import classRoutes from './classRoutes.js';
import studentRoutes from './studentRoutes.js';
import cubiRoutes from './cubiRoutes.js';

app.use('/api/auth/student', studentAuthRoutes);
app.use('/api/auth/teacher', teacherAuthRoutes);
app.use('/api/h5p', h5pRoutes);
app.use('/api/class', classRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/cubi', cubiRoutes);


export default app;