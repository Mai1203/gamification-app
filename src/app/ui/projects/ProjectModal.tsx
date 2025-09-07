'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Project, createProject, updateProject, deleteProject } from '@/app/services/projectService';
import EditorLive from '@/app/ui/learning/EditorLive';
import { X, Save, Trash2, AlertTriangle } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onProjectUpdated: () => void;
}

export default function ProjectModal({ project, onClose, onProjectUpdated }: ProjectModalProps) {
  const { user } = useUser();
  const [title, setTitle] = useState(project?.title || '');
  const [html, setHtml] = useState(project?.html || '');
  const [css, setCss] = useState(project?.css || '');
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setHtml(project.html);
      setCss(project.css);
    }
  }, [project]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    
    try {
      if (project?.id) {
        await updateProject(user.id, project.id, { title, html, css });
      } else {
        await createProject({
          userId: user.id,
          title,
          html,
          css,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      onProjectUpdated();
      onClose();
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!project?.id) return;
    if (!user) return;
    
    try {
      await deleteProject(user.id, project.id);
      onProjectUpdated();
      onClose();
    } catch (error) {
      console.error('Error deleting project:', error);
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const openDeleteConfirm = () => {
    setShowDeleteConfirm(true);
  };

  const closeDeleteConfirm = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col">
          <div className="flex justify-between items-center p-4 border-b dark:border-zinc-700">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título del proyecto"
              className="text-xl font-bold bg-transparent border-none focus:outline-none text-gray-700 dark:text-white flex-1 mr-4"
            />
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white cursor-pointer">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-hidden relative">
            <EditorLive
              defaultHtml={html}
              defaultCss={css}
              mode="css"
              onHtmlChange={setHtml}
              onCssChange={setCss}
            />
          </div>

          <div className="flex justify-between p-4 border-t dark:border-zinc-700">
            <div>
              {project?.id && (
                <button
                  onClick={openDeleteConfirm}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Trash2 size={20} /> Eliminar
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-white cursor-pointer transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Save size={20} /> {saving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                <AlertTriangle className="text-red-600 dark:text-red-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold dark:text-white">¿Eliminar proyecto?</h3>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              ¿Estás seguro de que deseas eliminar el proyecto `{title}`? Esta acción no se puede deshacer.
            </p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={closeDeleteConfirm}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}