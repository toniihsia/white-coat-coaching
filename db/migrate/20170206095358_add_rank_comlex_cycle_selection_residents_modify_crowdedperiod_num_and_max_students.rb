class AddRankComlexCycleSelectionResidentsModifyCrowdedperiodNumAndMaxStudents < ActiveRecord::Migration
  def change
    add_column :residencies, :positions_ranked, :string
    add_column :residencies, :comlex_cutoff, :string
    add_column :residencies, :interview_date, :string
    add_column :residencies, :interview_selection, :string
    add_column :residencies, :num_interviewed, :string
    add_column :residencies, :week_cycle, :string
    add_column :residencies, :residents, :string

    remove_column :residencies, :crowded_period_end
    remove_column :residencies, :num_students
    remove_column :residencies, :max_students

    rename_column :residencies, :crowded_period_start, :crowded_period
    add_column :residencies, :num_students, :string
    add_column :residencies, :max_students, :string
  end
end
