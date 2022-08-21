/*

   Copyright 2016-2022 Nernar (github.com/nernar)
   
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
   
       http://www.apache.org/licenses/LICENSE-2.0
   
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

*/

const IN_CREATIVE = false;

const getWorldsStorageLocation = function() {
	return __packdir__ + "worlds/";
};

const getModificationWorldDirectory = function() {
	return "Freddy Fazbear's";
};

const getModificationWorldName = function() {
	return "§l" + getModificationWorldDirectory();
};

const getModificationWorldLocation = function() {
	return getWorldsStorageLocation() + getModificationWorldDirectory() + "/";
};

const getEnvironmentDependentLocation = function() {
	return __dir__ + "assets/world/dependent.json";
};
