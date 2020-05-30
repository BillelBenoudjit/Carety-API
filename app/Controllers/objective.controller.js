const Objective = require('../Models/objective.model')
const { check, validationResult } = require("express-validator")

exports.addObjective = async (req, res) => {
    try {
        let foundObjective = await Objective.findOne({ 'objectiveName': req.body.objectiveName })
        if (foundObjective) {
            return res.status(400).json({
                msg: "Objective already exists !"
            })
        }

        let objective = new Objective(req.body)
        await objective.save()
        return res.status(200).json({
            objective
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            msg: "Error in saving",
            err: err.message
        })
    }
}

exports.getObjectives = async (req, res) => {
    try {
        let objectives = await Objective.find({})
        res.send(objectives)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.editObjectiveviews = async (req, res) => {
    let objective = await Objective.findById(req.params.id)
    if (!objective) {
        return res.status(404).json({
            msg: "Objective does not exist !"
        })
    } else {
        if (!objective.achieved) {
            try {
                if (objective.views + req.body.numberViews == objective.necessaryViews) {
                    objective.views = objective.views + req.body.numberViews
                    objective.achieved = true
                } else  if (objective.views + req.body.numberViews > objective.necessaryViews) {
                    objective.views = objective.necessaryViews
                    objective.achieved = true
                } else {
                    objective.views = objective.views + req.body.numberViews
                }
                await objective.save()
                return res.status(200).json({
                    objective,
                    msg: "Objective wiews edited"
                })
            } catch (err) {
                return res.status(400).json({
                    msg: "Error in editing",
                    err: err.message
                })
            }
        } else {
            return res.status(200).json({
                msg: "Objective achieved !"
            })
        }
    }
}

exports.deleteObjective = async (req, res) => {
    let objective = await Objective.findById(req.params.id)
    try {
        await objective.delete()
        return res.json({
            msg: 'Objective deleted !'
        })
    } catch (err) {
        return res.status(400).json({
            msg: "Error in deleting !",
            err: err.message
        })
    }
}

exports.getNearToReachObjective = async (req, res) => {
    try {
        let objectives = await Objective.find({})
        let nearToReachObjectives = []
        for (const objective of objectives) {
            if (objective.views / objective.necessaryViews >= 0.80 && !objective.achieved) {
                nearToReachObjectives.push(objective)
            }
        }
        if (nearToReachObjectives.length != 0) {
            return res.send(nearToReachObjectives)
        } else {
            return res.status(404).json({
                msg: "No objectives near to reach"
            })
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getImportantObjectives = async (req, res) => {
    try {
        let objectives = await Objective.find({})
        let importantObjectives = []
        for (const objective of objectives) {
            if (!objective.achieved && objective.necessaryViews >= 10 && objective.views/objective.necessaryViews <= 0.80) {
                importantObjectives.push(objective)
            }
        }
        if (importantObjectives.length != 0) {
            return res.send(importantObjectives)
        } else {
            return res.status(404).json({
                msg: "No important objectives"
            })
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getCountryObjectives = async (req, res) => {
    try {
        console.log(req.params.country)
        let objectives = await Objective.find({})
        let countryObjectives = []
        for (const objective of objectives) {
            if (objective.country === req.params.country) {
                countryObjectives.push(objective)
            }
        }
        if (countryObjectives.length != 0) {
            return res.send(countryObjectives)
        } else {
            return res.status(404).json({
                msg: "No country objectives"
            })
        }
    } catch (err) {
        res.status(500).send(err)
    }
}