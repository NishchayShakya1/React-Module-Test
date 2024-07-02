import React, { useState, useEffect } from 'react';
import sendIcon from '../assets/send.png';
import back from '../assets/back.png';
import './Notes.css'; // Ensure that this CSS file exists and contains appropriate styles

function Notes(props) {
  const [note, setNote] = useState('');

  const { groupSelect, groups, setGroups } = props;
  const notes = groupSelect.notes;

  const getScreen = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  const [screenSize, setScreenSize] = useState(getScreen());

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreen());
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const handleSubmit = () => {
    let newGroup = [...groups];
    let Chgroup = newGroup.find(group => group.id === groupSelect.id);

    let time = `${new Date().toLocaleTimeString('en-us', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })}`;

    let date = ` ${new Date().toLocaleDateString([], {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })}`;

    Chgroup.notes.push({ date, time, note });
    localStorage.setItem('groups', JSON.stringify(newGroup));
    setGroups(newGroup);
    setNote(''); 
  };

  const keypress = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      {screenSize.width < 989 ? (
        <div className="notesContainer">
          <div className="notesHeader">
            <img src={back} alt={back} onClick={() => { window.location.reload(); }} />
            <div className='notesGroup' style={{ background: groupSelect.color }}>
              {groupSelect.groupName?.slice(0, 2)?.toUpperCase()}
            </div>
            <h2 className="groupName">{groupSelect.groupName}</h2>
          </div>
          <div className="NotesAndDateMobile">
            {notes.map((note, index) => (
              <div key={index} className="DateAndText">
                <div className="DateAndTime">
                  <p className="TimeMobile">{note.time}</p>
                  <p className="DateMobile">{note.date}</p>
                </div>
                <p className="TextMobile">{note.note}</p>
              </div>
            ))}
          </div>
          <div className="TextareaMobile">
            <textarea
              className="TextInputMobile"
              type="text"
              value={note}
              onChange={handleChange}
              placeholder="Enter your text..."
              onKeyDown={keypress}
            ></textarea>
            <img
              src={sendIcon}
              className="SendImgMobile"
              alt="SendImg"
              onClick={handleSubmit}
            />
          </div>
        </div>
      ) : (
        <div className="notesContainer">
          <div className="notesHeader">
            <div className="notesGroup" style={{ background: groupSelect.color }}>
              {groupSelect.groupName?.slice(0, 2)?.toUpperCase()}
            </div>
            <h2 className="groupName">{groupSelect.groupName}</h2>
          </div>
          <div className="DateAndNotes">
            {notes.map((note, index) => (
              <div key={index} className="DateAndText">
                <div className="DateAndTime">
                  <p className="Time">{note.time}</p>
                  <p className="Date">{note.date}</p>
                </div>
                <p className="text">{note.note}</p>
              </div>
            ))}
          </div>
          <div className='Textarea'>
            <textarea
              name="text"
              className='TextInput'
              value={note}
              onChange={handleChange}
              placeholder='Enter Your notes ...'
              onKeyDown={keypress}
            ></textarea>
            <img src={sendIcon} alt="SendImg" className='sendImg' onClick={handleSubmit} />
          </div>
        </div>
      )}
    </>
  );
}

export default Notes;
