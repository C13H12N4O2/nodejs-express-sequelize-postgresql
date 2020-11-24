const db = require('../models');
const Tutorial = db.tutorials;
const OP = db.Sequelize.OP;

exports.create = (reqeust, response) => {
    if (!reqeust.body.title) {
        reqeust.status(400).send({
            message: 'Content can not be empty!'
        });
        
        return ;
    }
    
    const tutorial = {
        title: reqeust.body.title,
        description: reqeust.body.description,
        published: reqeust.body.published ? reqeust.body.published : false
    };
    
    Tutorial.create(tutorial).then(data => {
        response.send(data);
    }).catch(err => {
        response.status(500).send({
            message:
                err.message || 'Some error occurred while creating the Tutorial.'
        });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [OP.iLike]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.findOne = (reqeust, response) => {
    const id = reqeust.params.id;
    
    Tutorial.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        response.send(data);
    }).catch(err => {
        response.status(500).send({
            message: `Error retrieving Tutorial with id=${id}`
        });
    });
};

exports.update = (reqeust, response) => {
    const id = reqeust.params.id;
    
    Tutorial.update(reqeust.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            response.send({
                message: 'Tutorial was updated successfully.'
            });
        } else {
            response.send({
                message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or request.body is empty!`
            });
        }
    }).catch(err => {
        response.status(500).send({
            message: `Error updating Tutorial with id=${id}`
        });
    });
};

exports.delete = (reqeust, response) => {
    const id = reqeust.params.id;
    
    Tutorial.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            response.send({
                message: 'Tutorial was deleted successfully!'
            });
        } else {
            response.send({
                message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
            });
        }
    }).catch(err => {
        response.status(500).send({
            message: `Could not delete Tutorial with id=${id}`
        });
    });
};

exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};
            
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
