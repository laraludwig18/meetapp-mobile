import React, { useEffect, useState, useRef } from 'react';
import { useField } from '@rocketseat/unform';
import { MdCameraAlt } from 'react-icons/md';

import api from '~/services/api';
import { Label } from './styles';

export default function Banner() {
  const { defaultValue, registerField } = useField('banner');
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'banner_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <>
      <Label htmlFor="banner">
        {preview ? (
          <img src={preview} alt="banner" />
        ) : (
          <div>
            <MdCameraAlt size={54} color="rgba(255, 255, 255, 0.3)" />
            <span className="select-image">Selecionar imagem</span>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          id="banner"
          ref={ref}
        />
      </Label>
      {/* {error && <span>{error}</span>} */}
    </>
  );
}
