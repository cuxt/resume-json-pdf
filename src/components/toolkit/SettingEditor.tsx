import useEditWithUndo from "@/hooks/useEditWithUndo";
import useModeStore from "@/stores/modeStore";
import { StyleData } from "@/types/style";
import React from "react";
import { BsImageFill } from "react-icons/bs";
import { RiSave3Fill } from "react-icons/ri";
import { TbLocationCancel } from "react-icons/tb";
import StyleSlider from "./StyleSlider";

const titleStyle = "font-semibold text-sky-500 my-3 text-center";
const buttonStyle = "fixed top-4 p-2 w-30 text-sm font-semibold bg-white text-sky-600 rounded-lg shadow-md flex items-center justify-center"

const SettingEditor: React.FC = () => {
    const { setEditModeStore } = useModeStore();
    const { confirmEdit: confirmEditProfile, cancelEdit: cancelEditProfile, updateTempData: updateTempProfile } = useEditWithUndo('profileStore');
    const { tempStore: tempStyleStore, confirmEdit: confirmEditStyle, cancelEdit: cancelEditStyle, updateTempData: updateTempStyle } = useEditWithUndo('styleStore');

    const confirmEdit = () => {
        confirmEditStyle();
        confirmEditProfile();
        setEditModeStore(false)
    }

    const cancelEdit = () => {
        cancelEditStyle();
        cancelEditProfile();
        setEditModeStore(false)
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                updateTempProfile({ avatar: base64String });
            };
            reader.readAsDataURL(file);
        }
    };


    const handleStyleChange = (key: keyof StyleData, value: number) => {
        updateTempStyle({ [key]: value });
    };

    return (
        <>
            <div className="fixed top-16 z-5 w-96 overflow-y-auto max-h-screen px-4 py-2 transition-all duration-500 ease-in-out">
                <button onClick={confirmEdit} className={`${buttonStyle} left-6`}>
                    <div className="flex items-center">
                        <RiSave3Fill className="mr-2" />
                        <span className="text-xs">Save</span>
                    </div>
                </button>

                <button onClick={cancelEdit} className={`${buttonStyle} left-28`}>
                    <div className="flex items-center">
                        <TbLocationCancel className="mr-2" />
                        <span className="text-xs">Cancel</span>
                    </div>
                </button>

                {/* 上传图片 */}
                <label className="bg-sky-500 hover:bg-sky-700 text-white font-semibold py-2 px-9 rounded inline-flex items-center m-8 cursor-pointer">
                    <input type="file" className="hidden" onChange={handleImageChange} />
                    <BsImageFill className="mx-4" />
                    <span className="text-sm">Upload Avatar Image</span>
                </label>

                {/* 滑动修改样式 */}
                <div className="space-y-16 mx-8 my-4">
                    <div>
                        <h3 className={titleStyle}>Page Padding Y</h3>
                        <StyleSlider
                            min={16} max={40}
                            value={tempStyleStore?.pagePy}
                            onChange={(newValue) => handleStyleChange('pagePy', newValue)}
                        />
                    </div>

                    <div>
                        <h3 className={titleStyle}>Profile Margin Bottom</h3>
                        <StyleSlider
                            min={0} max={24}
                            value={tempStyleStore?.profileMb}
                            onChange={(newValue) => handleStyleChange('profileMb', newValue)}
                        />
                    </div>

                    <div>
                        <h3 className={titleStyle}>Experience Margin Bottom</h3>
                        <StyleSlider
                            min={0} max={24}
                            value={tempStyleStore?.experienceMb}
                            onChange={(newValue) => handleStyleChange('experienceMb', newValue)}
                        />
                    </div>
                </div>

            </div>
        </>
    )
}

export default SettingEditor;