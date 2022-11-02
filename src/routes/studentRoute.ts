import expres from "express";
import { AppDataSource } from "../app";
import { Student } from "../entites/Student";
const router = expres.Router();

//get student api
router.get("/", async (req, res, next) => {
  try {
    const studentRepo = AppDataSource.getRepository(Student);
    const studentFound = await studentRepo.find({relations: {subjects: true} });
    res.status(200).json({ data: studentFound });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

//get student api
router.get("/:id", async (req, res, next) => {
    try {
     const studentRepo = AppDataSource.getRepository(Student);

     const studentFound = await studentRepo.find({relations: {subjects: true}, where: {id: req.params.id}});
     //relations: {subjects: true},
     if(studentFound) {
        res.status(200).json({ data: studentFound });
     } else {
        res.status(200).json({ data: "No Matching Found" });
     }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  });

//post student api
router.post("/", async (req, res, next) => {
  try {
    const studentRepo = AppDataSource.getRepository(Student);
    let {
      firstName,
      lastName,
      dateOfBirth,
      age,
      standard,
      city,
      skills,
      briefIntro,
      enrollmentFrom,
      enrollmentTo,
      status,
      isActive,
      subjects,
    } = req.body;
    let studentDetails =  {firstName,lastName,dateOfBirth,age,city,standard,skills,briefIntro,enrollmentFrom,enrollmentTo,status,isActive, subjects};

    let studentInserted = await studentRepo.save(studentDetails);
    res.status(200).json({data: studentInserted});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

//put student api
router.put("/:id", async (req, res, next) => {
  try {
    let {
        firstName,
        lastName,
        dateOfBirth,
        age,
        standard,
        skills,
        city,
        briefIntro,
        enrollmentFrom,
        enrollmentTo,
        status,
        isActive,
        subjects,
      } = req.body;
      let studentDetails =  {firstName,lastName,city,dateOfBirth,age,standard,skills,briefIntro,enrollmentFrom,enrollmentTo,status,isActive, subjects};  
    const studentRepo = AppDataSource.getRepository(Student);
    let studentFound = await studentRepo.findOne({relations: {subjects: true}, where: {id: req.params.id}});
    //relations: {subjects: true}, 
    if(studentFound) {
        let studentInserted = await studentRepo.save({...studentFound, ...studentDetails});
        res.status(200).json({data: studentInserted});
     } else {
        res.status(200).json({ data: "No Matching Found" });
     }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

//delete student api
router.delete("/:id", async (req, res, next) => {
  try {
    const studentRepo = AppDataSource.getRepository(Student);
    let deletedStudent = await studentRepo.delete({id: req.params.id});
    res.status(200).json({ data: deletedStudent });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

export default router;
