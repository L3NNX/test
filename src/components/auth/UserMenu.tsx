import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { User, Settings, LogOut, Bell, Heart, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const UserMenu: React.FC = () => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors">
        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
          <User size={20} className="text-primary-600" />
        </div>
        <span className="hidden md:block text-sm font-medium">{user.email}</span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/dashboard"
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } flex items-center px-4 py-2 text-sm text-gray-700`}
                >
                  <FileText size={16} className="mr-2" />
                  Dashboard
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/notifications"
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } flex items-center px-4 py-2 text-sm text-gray-700`}
                >
                  <Bell size={16} className="mr-2" />
                  Notifications
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/favorites"
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } flex items-center px-4 py-2 text-sm text-gray-700`}
                >
                  <Heart size={16} className="mr-2" />
                  Favorites
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/settings"
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } flex items-center px-4 py-2 text-sm text-gray-700`}
                >
                  <Settings size={16} className="mr-2" />
                  Settings
                </Link>
              )}
            </Menu.Item>

            <div className="border-t border-gray-100">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => signOut()}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;