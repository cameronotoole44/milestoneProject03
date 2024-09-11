"""added difficulty to challenge and enum

Revision ID: 2b667636581e
Revises: 6e1021e1f1a1
Create Date: 2024-09-11 19:12:15.403642

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '2b667636581e'
down_revision = '6e1021e1f1a1'
branch_labels = None
depends_on = None


difficulty_enum = postgresql.ENUM('easy', 'medium', 'hard', name='DifficultyEnum')

def upgrade():
    # Create the enum type
    difficulty_enum.create(op.get_bind())
    
    # Add the new column with the enum type
    op.add_column('challenge', sa.Column('difficulty', difficulty_enum, nullable=False))

def downgrade():
    # Drop the column
    op.drop_column('challenge', 'difficulty')
    
    # Drop the enum type
    difficulty_enum.drop(op.get_bind())
