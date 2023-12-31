const { getAllLaunches, addNewLaunch, existLaunchWithId, abortLaunchById } = require('../../models/launches.model');
const launchesRouter = require('./launches.router');

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}


function httpAddNewLaunch(req, res) {
    const launch = req.body

    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'Missing required launch property',
        });
    }

    launch.launchDate = new Date(launch.launchDate)
    if (isNaN(launch.launchDate)) { // isNaN is checking if it is not a number -> we need not to add ! because it already saying  that it is not a number.
        return res.status(400).json({
            error: 'Invalid launch date',
        })
    }


    addNewLaunch(launch);
    return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);

    //if launch doesn't exist
    if (!existLaunchWithId(launchId)) {
        return res.status(404).json({
            error: 'Launch not found',
        })
    }

    //if does exist
    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted)
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}  