/* eslint-disable react-hooks/set-state-in-effect */
import "./Profile.css";

export default function Profile() {

    const userName =
        localStorage.getItem("userName");

    const email =
        localStorage.getItem("email");

    return (

        <div className="profile-page">

            <div className="profile-card">

                <div className="profile-header">

                    <div className="profile-avatar">
                        {userName?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h2>{userName}</h2>
                        <p>{email}</p>
                    </div>

                </div>

                <div className="profile-body">

                    <div className="info-row">
                        <label>Username</label>
                        <span>{userName}</span>
                    </div>

                    <div className="info-row">
                        <label>Email</label>
                        <span>{email}</span>
                    </div>

                    <div className="info-row">
                        <label>Role</label>
                        <span>Administrator</span>
                    </div>

                </div>

                <div className="profile-actions">

                    <button className="btn-primary">
                        Change Password
                    </button>

                    <button className="btn-secondary">
                        Edit Profile
                    </button>

                </div>

            </div>

        </div>

    );
}