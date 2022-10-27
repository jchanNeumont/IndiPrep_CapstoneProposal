// DAL - Data Access Layer
// CRUD - Create, Read, Update, Delete

//npm i --save mongodb

const { json } = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const { on } = require('nodemon');
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/IndiPrep';
mongoose.connect(url);

let mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', callback => {});

const uri = "mongodb://localhost:27017";

const expressDBName = "IndiPrep";
const people_collection = "people_collection";
const job_collection = "job_collection";
const company_collection = "company_collection";
const applied_collection = "applied_collection";


let userSchema = mongoose.Schema ({
    FirstName: String,
    LastName: String,
    EducationLevel: String,
    PhoneNumber: String,
    Email: String,
    DateOfBirth: String,
    Age: Number,
    Gender: String,
    Username: String,
    Password: String,
    Answers: Object,
    Admin: Boolean,
    Reviews: Object
});

let companySchema = mongoose.Schema ({
    CompanyTitle: String,
    Industry: String,
    Email: String,
    EducationRequirement: String,
    Password: String,
    PhoneNumber: String,
    Reviews: Object,
    Admin: Boolean
})
let Company = mongoose.model(company_collection, companySchema);

let jobSchema = mongoose.Schema ({
    JobCompany: {type: mongoose.Schema.Types.ObjectId, ref: Company},
    JobTitle: String,
    JobTags: Object,
    JobSalary: Number,
    JobDescription: String
});


let User = mongoose.model(people_collection, userSchema);
let Job = mongoose.model(job_collection, jobSchema);

let applySchema = mongoose.Schema ({
    Applier: {type: mongoose.Schema.Types.ObjectId, ref: User},
    ApplyJob: {type: mongoose.Schema.Types.ObjectId, ref: Job},
});

let Applied = mongoose.model(applied_collection, applySchema);

const getAllJobs = async () => {
    var jobList = await Job.find({});
    return jobList;
}

const findUserByEmail = async (email) => {
    var user = await User.findOne({Email: email});
    if (user == null){
        user = await Company.findOne({Email: email});
    }
    console.log("User: " + user);
    console.log("Email Input: " + email);
    return user;
}

const findCompanyByEmail = async (email) => {
    var user = await Company.findOne({Email: email});
    console.log("Company: " + user);
    console.log("Email Input: " + email);
    return user;
}

const createJob = async (jobCompany, jobTitle, jobTags, jobSalary, jobDescription) => {
    const client = await MongoClient.connect(uri);

    try{
        //actual code to interact with mongodb
        const db = client.db(expressDBName);

        const collection = db.collection(job_collection);

        let job = new Job({
            jobCompany: jobCompany,
            JobTitle: jobTitle,
            JobTags: jobTags,
            JobSalary: jobSalary,
            JobDescription: jobDescription
        });

        //var results = await collection.insertOne(user);
        job.save().then(job => console.log(job.JobTitle + ' added.'));

        //console.log("createUsers: results");
        //console.log(results);

        //return results;

    }catch(err){
        console.log("createJob: Something bad happened.");
        console.log(err);
    }finally{
        client.close();
    }
}

const createCompany = async (companyTitle, industry, educationRequirement, password, email, phoneNumber, admin) => {
    try{
        let company = new Company({
            CompanyTitle: companyTitle,
            Industry: industry,
            Email: email,
            EducationRequirement: educationRequirement,
            Password: password,
            PhoneNumber: phoneNumber,
            Reviews: null,
            Admin: admin
        });

        company.save().then(company => console.log(company.CompanyTitle + ' ' + company.Industry + ' added.'));
    }catch (err){
        console.log(err);
    }
}


const createUser = async (firstname, lastname, el, phonenumber, dob, gender, username, password, age, email, answers, admin) => {
    const client = await MongoClient.connect(uri);

    try{
        //actual code to interact with mongodb
        const db = client.db(expressDBName);

        const collection = db.collection(people_collection);

        if(await User.findOne({Email: email})){
            console.log("Found User: " + await User.findOne({Email: email}).Email);
            console.log("Email already Exists");
        }

        let user = new User({
            FirstName: firstname,
            LastName: lastname,
            EducationLevel: el,
            PhoneNumber: phonenumber,
            Email: email,
            DateOfBirth: dob,
            Age: age,
            Gender: gender,
            Username: username,
            Password: password,
            Answers: answers,
            Admin: admin,
            Reviews: null
        });

        //var results = await collection.insertOne(user);
        user.save().then(user => console.log(user.firstName + ' ' + user.lastName + ' added.'));

        //console.log("createUsers: results");
        //console.log(results);

        //return results;

    }catch(err){
        console.log("createUsers: Something bad happened.");
        console.log(err);
    }finally{
        client.close();
    }
}

const makeAdmin = async (username) => {
    const client = await MongoClient.connect(uri);

    try{
        const db = client.db(expressDBName);

        const collection = db.collection(expressCollectionName);

        var query = {   };

        var results = await collection.findOne({Username: username})
        await collection.updateOne({_id: results._id}, {$set : {"Admin":"on"}},
        {upsert:false,
        multi:true});
        //console.log(results);

        //return results;

    }catch(err){
        //console.log("getAllBulldogs: Something bad happened.");
        console.log(err);
    }finally{
        client.close();
    } 
}

const deleteUser = async (username) => {
    const client = await MongoClient.connect(uri);

    try{
        const db = client.db(expressDBName);

        const collection = db.collection(expressCollectionName);

        var query = {   };

        var results = await collection.findOne({Username: username})
        await collection.deleteOne({_id: results._id});
        //console.log(results);

        //return results;

    }catch(err){
        //console.log("getAllBulldogs: Something bad happened.");
        console.log(err);
    }finally{
        client.close();
    }
}

const getDataForChart1 = async () => {
    const client = await MongoClient.connect(uri);

    try{
        const db = client.db(expressDBName);

        const collection = db.collection(expressCollectionName);

        let Q1Num1Count = 0;
        let Q1Num2Count = 0;
        let Q1Num3Count = 0;
            
        //await collection.find().forEach(doc => {console.log(doc.Answers["Answer1"])});
        await collection.find().forEach(doc => {if (doc.Answers["Answer1"] == 1){
            Q1Num1Count++;
        }});
        await collection.find().forEach(doc => {if (doc.Answers["Answer1"] == 2){
            Q1Num2Count++;
        }});
        await collection.find().forEach(doc => {if (doc.Answers["Answer1"] == 3){
            Q1Num3Count++;
        }});


        let result = {
            Q1A1Count: Q1Num1Count,
            Q1A2Count: Q1Num2Count,
            Q1A3Count: Q1Num3Count,
        }

        return result;

        // var query = {   };

        //console.log(update);

        //var results = await collection.updateOne({_id: new ObjectId(id)}, { $set: {Username: update.Username, Password: update.Password, Age: update.Age, Email: update.Email, Answers: update.Answers}});

        //console.log(results);

        //return results;

    }catch(err){
        //console.log("getAllBulldogs: Something bad happened.");
        console.log(err);
    }finally{
        client.close();
    }
}

const getDataForChart2 = async () => {
    const client = await MongoClient.connect(uri);

    try{
        const db = client.db(expressDBName);

        const collection = db.collection(expressCollectionName);

        let Q2Num1Count = 0;
        let Q2Num2Count = 0;
        let Q2Num3Count = 0;

        //await collection.find().forEach(doc => {console.log(doc.Answers["Answer1"])});
        await collection.find().forEach(doc => {if (doc.Answers["Answer2"] == 1){
            Q2Num1Count++;
        }});
        await collection.find().forEach(doc => {if (doc.Answers["Answer2"] == 2){
            Q2Num2Count++;
        }});
        await collection.find().forEach(doc => {if (doc.Answers["Answer2"] == 3){
            Q2Num3Count++;
        }});


        let result = {
            Q2A1Count: Q2Num1Count,
            Q2A2Count: Q2Num2Count,
            Q2A3Count: Q2Num3Count,
        }

        return result;

        // var query = {   };

        //console.log(update);

        //var results = await collection.updateOne({_id: new ObjectId(id)}, { $set: {Username: update.Username, Password: update.Password, Age: update.Age, Email: update.Email, Answers: update.Answers}});

        //console.log(results);

        //return results;

    }catch(err){
        //console.log("getAllBulldogs: Something bad happened.");
        console.log(err);
    }finally{
        client.close();
    }
}

const getDataForChart3 = async () => {
    const client = await MongoClient.connect(uri);

    try{
        const db = client.db(expressDBName);

        const collection = db.collection(expressCollectionName);

        let Q3Num1Count = 0;
        let Q3Num2Count = 0;
        let Q3Num3Count = 0;
            
        //await collection.find().forEach(doc => {console.log(doc.Answers["Answer1"])});
        await collection.find().forEach(doc => {if (doc.Answers["Answer3"] == 1){
            Q3Num1Count++;
        }});
        await collection.find().forEach(doc => {if (doc.Answers["Answer3"] == 2){
            Q3Num2Count++;
        }});
        await collection.find().forEach(doc => {if (doc.Answers["Answer3"] == 3){
            Q3Num3Count++;
        }});

        let result = {
            Q3A1Count: Q3Num1Count,
            Q3A2Count: Q3Num2Count,
            Q3A3Count: Q3Num3Count,
        }

        return result;

        // var query = {   };

        //console.log(update);

        //var results = await collection.updateOne({_id: new ObjectId(id)}, { $set: {Username: update.Username, Password: update.Password, Age: update.Age, Email: update.Email, Answers: update.Answers}});

        //console.log(results);

        //return results;

    }catch(err){
        //console.log("getAllBulldogs: Something bad happened.");
        console.log(err);
    }finally{
        client.close();
    }
}

const updateUser = async (id,user,update) => {
    const client = await MongoClient.connect(uri);

    try{
        const db = client.db(expressDBName);

        const collection = db.collection(expressCollectionName);

        var query = {   };

        console.log(update);

        var results = await collection.updateOne({_id: new ObjectId(id)}, { $set: {Username: update.Username, Password: update.Password, Age: update.Age, Email: update.Email, Answers: update.Answers}});

        //console.log(results);

        return results;

    }catch(err){
        //console.log("getAllBulldogs: Something bad happened.");
        console.log(err);
    }finally{
        client.close();
    }
}

const findUserByUsername = async (user) => {
    const client = await MongoClient.connect(uri);

    try{
        const db = client.db(expressDBName);

        const collection = db.collection(expressCollectionName);

        var query = {   };

        var results = await collection.findOne({Username: user})

        //console.log(results);

        return results;

    }catch(err){
        //console.log("getAllBulldogs: Something bad happened.");
        console.log(err);
    }finally{
        client.close();
    }
}

exports.createJob = createJob;
exports.findCompanyByEmail = findCompanyByEmail;
exports.createCompany = createCompany;
exports.findUserByEmail = findUserByEmail;
exports.getAllJobs = getAllJobs;
exports.createUser = createUser;
exports.findUserByUsername = findUserByUsername;
exports.updateUser = updateUser;
exports.getDataForChart1 = getDataForChart1;
exports.getDataForChart2 = getDataForChart2;
exports.getDataForChart3 = getDataForChart3;
exports.deleteUser = deleteUser;
exports.makeAdmin = makeAdmin;