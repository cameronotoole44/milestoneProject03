"""added challenge time generation check

Revision ID: 247f69b84dba
Revises: 648922d033b2
Create Date: 2024-09-21 11:50:56.923869

"""
from typing import Sequence, Union
from datetime import datetime
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '247f69b84dba'
down_revision: Union[str, None] = '648922d033b2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Add the new column with a default value
    with op.batch_alter_table('user_daily_challenges', schema=None) as batch_op:
        batch_op.add_column(sa.Column('last_challenge_time', sa.DateTime(), nullable=False, server_default=sa.func.now()))
        batch_op.alter_column('correct',
               existing_type=sa.BOOLEAN(),
               nullable=True)

def downgrade() -> None:
    # Remove the column on downgrade
    with op.batch_alter_table('user_daily_challenges', schema=None) as batch_op:
        batch_op.alter_column('correct',
               existing_type=sa.BOOLEAN(),
               nullable=False)
        batch_op.drop_column('last_challenge_time')
