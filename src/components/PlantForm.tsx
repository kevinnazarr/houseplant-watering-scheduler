import { useState, type FormEvent } from 'react';

interface PlantFormData {
  name: string;
  nickname: string;
  frequency: string;
  note: string;
}

interface PlantFormProps {
  onAddPlant: (data: {
    name: string;
    nickname?: string;
    frequency: number;
    note?: string;
  }) => void;
}

export function PlantForm({ onAddPlant }: PlantFormProps) {
  const [formData, setFormData] = useState<PlantFormData>({
    name: '',
    nickname: '',
    frequency: '',
    note: '',
  });
  const [errors, setErrors] = useState<{ name?: string; frequency?: string }>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (name === 'name' || name === 'frequency') {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const newErrors: { name?: string; frequency?: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Plant name is required';
    }

    const freq = Number(formData.frequency);
    if (!formData.frequency || isNaN(freq) || freq <= 0 || !Number.isInteger(freq)) {
      newErrors.frequency = 'Please enter a valid number of days (whole number > 0)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddPlant({
      name: formData.name.trim(),
      nickname: formData.nickname.trim() || undefined,
      frequency: freq,
      note: formData.note.trim() || undefined,
    });

    setFormData({ name: '', nickname: '', frequency: '', note: '' });
  }

  return (
    <form className="plant-form" onSubmit={handleSubmit} noValidate>
      <h2>Add a New Plant</h2>

      <div className="form-group">
        <label htmlFor="plant-name">
          Plant Name <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          id="plant-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Monstera Deliciosa"
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <span id="name-error" className="error-message" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="plant-nickname">Nickname (optional)</label>
        <input
          id="plant-nickname"
          name="nickname"
          type="text"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="e.g. Momo"
        />
      </div>

      <div className="form-group">
        <label htmlFor="plant-frequency">
          Watering Frequency (days) <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          id="plant-frequency"
          name="frequency"
          type="number"
          min="1"
          step="1"
          value={formData.frequency}
          onChange={handleChange}
          placeholder="e.g. 7"
          aria-required="true"
          aria-invalid={!!errors.frequency}
          aria-describedby={errors.frequency ? 'frequency-error' : undefined}
        />
        {errors.frequency && (
          <span id="frequency-error" className="error-message" role="alert">
            {errors.frequency}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="plant-note">Note (optional)</label>
        <textarea
          id="plant-note"
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder="e.g. Needs distilled water"
          rows={2}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Add Plant
      </button>
    </form>
  );
}
