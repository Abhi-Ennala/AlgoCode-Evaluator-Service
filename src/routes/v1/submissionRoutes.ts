import express from 'express';
import { addSubmission } from '../../controllers/submissionController';
import { validate } from '../../validators/createSubmission.validator';
import { createSubmissionZodSchema } from '../../dto(s)/createSubmission.dto';

const submissionRouter = express.Router();

submissionRouter.post('/', validate(createSubmissionZodSchema), addSubmission);

export default submissionRouter;