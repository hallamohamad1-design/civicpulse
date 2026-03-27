const db = require('../db');

exports.createIssue = async (req, res) => {
  try {
    // Requires req.user from authMiddleware
    const { title, description, category, latitude, longitude, severity } = req.body;
    const user_id = req.user.id;
    const image_url = req.file ? req.file.path : null;

    const newIssue = await db.query(
      `INSERT INTO issues 
        (user_id, title, description, category, latitude, longitude, severity, image_url) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [user_id, title, description || '', category, latitude, longitude, severity || 1, image_url]
    );

    // Get io instance from app (which we'll need to pass or attach to req)
    const io = req.app.get('io');
    if (io) {
      io.emit('new_issue', newIssue.rows[0]);
    }

    res.status(201).json({
      message: 'Issue created successfully',
      issue: newIssue.rows[0]
    });
  } catch (error) {
    console.error('Create Issue Error:', error);
    res.status(500).json({ message: 'Server error creating issue' });
  }
};

exports.getIssues = async (req, res) => {
  try {
    const { status, category } = req.query;
    
    let query = 'SELECT * FROM issues';
    let params = [];
    let conditions = [];

    if (status) {
      params.push(status);
      conditions.push(`status = $${params.length}`);
    }
    if (category) {
      params.push(category);
      conditions.push(`category = $${params.length}`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    query += ' ORDER BY priority_score DESC, created_at DESC';

    const issues = await db.query(query, params);
    
    res.status(200).json({ issues: issues.rows });
  } catch (error) {
    console.error('Fetch Issues Error:', error);
    res.status(500).json({ message: 'Server error fetching issues' });
  }
};

exports.updateIssueStatus = async (req, res) => {
  try {
    // Requires requireRole(['OFFICIAL', 'ADMIN'])
    const { id } = req.params;
    const { status, resolution_reason, department_id } = req.body;

    // Build dynamic update
    let updateFields = [];
    let params = [id];
    let paramIndex = 2;

    if (status) {
      updateFields.push(`status = $${paramIndex++}`);
      params.push(status);
    }
    if (resolution_reason) {
      updateFields.push(`resolution_reason = $${paramIndex++}`);
      params.push(resolution_reason);
    }
    if (department_id) {
      updateFields.push(`department_id = $${paramIndex++}`);
      params.push(department_id);
    }
    
    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);

    if (updateFields.length === 1) { // only updated_at
      return res.status(400).json({ message: 'No valid update fields provided' });
    }

    const updateQuery = `
      UPDATE issues 
      SET ${updateFields.join(', ')} 
      WHERE id = $1 
      RETURNING *
    `;

    const updatedIssue = await db.query(updateQuery, params);

    if (updatedIssue.rows.length === 0) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    const io = req.app.get('io');
    if (io) {
      io.to(id).emit('issue_updated', updatedIssue.rows[0]);
    }

    res.status(200).json({
      message: 'Issue updated successfully',
      issue: updatedIssue.rows[0]
    });

  } catch (error) {
    console.error('Update Issue Error:', error);
    res.status(500).json({ message: 'Server error updating issue' });
  }
};
